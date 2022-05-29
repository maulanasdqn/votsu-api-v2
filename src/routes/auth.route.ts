import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const auth = Router();
const prisma = new PrismaClient();

auth.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, error: "Pengguna tidak di temukan" });
  }

  try {
    if (await argon2.verify(user.password, password)) {
      const accessToken = jwt.sign({ userId: user.id }, "secret");
      return res.status(200).json({ success: true, accessToken: accessToken });
    } else {
      return res.status(400).json({ success: false, error: "Password salah" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
});

auth.post("/register", async (req, res) => {
  const { full_name, email, password, student_id, grade } = req.body;

  const studentIdCheck = await prisma.user.findUnique({
    where: {
      student_id: student_id,
    },
  });

  const emailCheck = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (studentIdCheck && emailCheck) {
    return res
      .status(400)
      .json({ success: false, error: "NIM dan Email sudah terdaftar" });
  } else if (emailCheck) {
    return res
      .status(400)
      .json({ success: false, error: "Email sudah terdaftar" });
  } else if (studentIdCheck) {
    return res
      .status(400)
      .json({ success: false, error: "NIM sudah terdaftar" });
  }

  const hashedPassword = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      student_id: student_id,
      full_name: full_name,
      class: grade,
      departement: "Informatika",
      is_chosen: false,
      role_id: 2,
    },
  });

  const accessToken = jwt.sign({ userId: user.id }, "secret");
  return res.status(200).json({ success: true, accessToken: accessToken });
});
