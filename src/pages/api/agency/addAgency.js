import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()

if (req.method === 'POST') {
  const { estado, municipio, ubicacion, nombre_Agencia, cod_agencia, extension } = req.body;

  try {
    await prisma.$queryRaw`INSERT INTO public.tbl_direccion_agencias(
      direccion, localizacion, estado, municipio)
      VALUES (${ubicacion}, ${ubicacion}, ${estado}, ${municipio});`;

    const validate = await prisma.$queryRaw`SELECT * FROM public.tbl_direccion_agencias WHERE direccion = ${ubicacion} AND localizacion = ${ubicacion} AND estado = ${estado} AND municipio = ${municipio};`;

    await prisma.$queryRaw`INSERT INTO public.tbl_ext_oficina(
      extensionn, ext_completa)
      VALUES (${extension}, 'xxxx-xxx-xxxx');`

      const validateExt = await prisma.$queryRaw`SELECT * FROM public.tbl_ext_oficina WHERE extensionn = ${extension} AND ext_completa = 'xxxx-xxx-xxxx';`;


    if (validate.length > 0) {
      await prisma.$queryRaw`INSERT INTO public.tbl_datos_agencias(
        estatus_agencia, direccion_agencia, nombre_agencia, ext_agencia, cod_oficina)
        VALUES (1, ${validate[0].id}, ${nombre_Agencia}, ${validateExt[0].id}, ${cod_agencia});`

      const validate2 = await prisma.$queryRaw`SELECT * FROM public.tbl_datos_agencias WHERE direccion_agencia = ${validate[0].id} AND nombre_agencia = ${nombre_Agencia} AND ext_agencia = ${extension} AND cod_oficina = ${cod_agencia};`;
      
      if (validate2.length > 0) {
        console.log("ok")
        return res.json({ status:"ok", message: 'El registro se ha guardado satisfactoriamente' });
      }
    } else {
      console.log('No se insertó ningún registro.');
    }
  

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}

}