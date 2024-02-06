import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  if (req.method === 'POST') {

    const {nombre_dispositivo, fabricante, tipoEnlace, velocidad, tipo_dispositivo, status} = req.body

    try {
      await prisma.$queryRaw`INSERT INTO public.tbl_datos_dispositivos(
        nombre_dispositivo, fabricante, tipo_enlace, velocidad, tipo_dispositivo, estatus)
        VALUES ( ${nombre_dispositivo}, ${fabricante}, ${tipoEnlace}, ${velocidad}, ${tipo_dispositivo}, ${status});`;

        const result = await prisma.$queryRaw`SELECT * FROM public.tbl_datos_dispositivos WHERE nombre_dispositivo = ${nombre_dispositivo};`;

        console.log(result)

      if (result.length === 0) {
        return res.status(400).json({ error: 'Ha ocurrido un error' });
      }

      return res.status(200).json({ success: 'Los datos se han guardado satisfactoriamente', data: result });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error del servidor' });
    }
  } else if (req.method === 'GET') {
    try {
      const result = await prisma.$queryRaw`SELECT * FROM public.tbl_datos_dispositivos`

      console.log(result)

      return res.status(200).json({ success: 'success', data: result });
        } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al realizar la consulta.' });
    } finally {
      await prisma.$disconnect();
    }
  }
}