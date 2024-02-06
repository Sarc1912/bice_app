import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient()
  
  if (req.method === 'GET') {
    try {
      const result = await prisma.$queryRaw`SELECT 
      tbl_datos_agencias.id_agencia,
      tbl_datos_agencias.nombre_agencia,
      tbl_datos_agencias.cod_oficina,
      tbl_estatus_agencia.descr_estatus_agencia,
      tbl_direccion_agencias.direccion,
      tbl_ext_oficina.extensionn
  FROM 
      public.tbl_datos_agencias
  LEFT JOIN 
      public.tbl_estatus_agencia ON tbl_datos_agencias.estatus_agencia = tbl_estatus_agencia.id_estatus_agencia
  LEFT JOIN 
      public.tbl_direccion_agencias ON tbl_datos_agencias.direccion_agencia = tbl_direccion_agencias.id_direccion
  LEFT JOIN 
      public.tbl_ext_oficina ON tbl_datos_agencias.ext_agencia = tbl_ext_oficina.extensionn;`

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al realizar la consulta.' });
    } finally {
      await prisma.$disconnect();
    }
  }

  if (req.method === 'POST') {
    
  }
}
