import jwt from "jsonwebtoken";

export const authMiddleware = (patient) => {
  const token = jwt.sign(
    { patient_id: patient.patient_id, email: patient.email },
    "HJSDHDSLDLSDJSL",
    { expiresIn: "1h" }
  );

  return token;
};
