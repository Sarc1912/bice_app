import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';


export function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const result = await prisma.$queryRaw`SELECT * FROM tbl_usuarios WHERE correo = ${username}`;

      if (result.length === 0) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }

      const user = result[0];

      // Aquí debes verificar la contraseña. Asegúrate de que estás almacenando las contraseñas de forma segura (por ejemplo, usando bcrypt)
      if (user.clave !== password) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      const token = generateToken(user);

      return res.json({ user, token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error del servidor' });
    }
  } else {
    // Maneja cualquier otro método HTTP
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}