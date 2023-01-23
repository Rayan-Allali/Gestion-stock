const  {PrismaClient} =require("@prisma/client");
const Prisma=new PrismaClient()
async function main() {
const clients=await Prisma.fournisseur.create({data:{
  nomF: "Kleinfeld",
  prenomF: "Eugenio",
  teleF: "989-956-1716",
  img: "https://robohash.org/doloresutest.png?size=20x20&set=set1",
  adressF: "00 David Court"
}})
}
main()
  .then(async () => {
    await Prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await Prisma.$disconnect()
    process.exit(1)
  })