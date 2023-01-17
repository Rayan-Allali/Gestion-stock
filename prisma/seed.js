const  {PrismaClient} =require("@prisma/client");
const Prisma=new PrismaClient()

const data=[
  {
    nomF: "Asipenko",
    prenomF: "Elise",
    teleF: "973-665-5906",
    img: "https://robohash.org/rationequibusdamat.png?size=20x20&set=set1",
    adressF: "22600 Sloan Hill"
  },
  {
    nomF: "Sterricker",
    prenomF: "Roberto",
    teleF: "190-141-2496",
    img: "https://robohash.org/saepeuteius.png?size=20x20&set=set1",
    adressF: "6 Buell Park"
  },
  {
    nomF: "Gruszecki",
    prenomF: "Marybeth",
    teleF: "245-981-0769",
    img: "https://robohash.org/laborumvelitquo.png?size=20x20&set=set1",
    adressF: "4304 Green Trail"
  },
  {
    nomF: "McCluin",
    prenomF: "Chastity",
    teleF: "413-918-6094",
    img: "https://robohash.org/consequuntursedfacere.png?size=20x20&set=set1",
    adressF: "09 Graceland Trail"
  },
  {
    nomF: "Emanuele",
    prenomF: "Braden",
    teleF: "348-151-8565",
    img: "https://robohash.org/etcommodiculpa.png?size=20x20&set=set1",
    adressF: "7965 Magdeline Parkway"
  },
  {
    nomF: "Brambell",
    prenomF: "Robin",
    teleF: "941-928-8302",
    img: "https://robohash.org/consequaturillosequi.png?size=20x20&set=set1",
    adressF: "88686 Sachtjen Point"
  },
  {
    nomF: "Suddards",
    prenomF: "Oberon",
    teleF: "487-372-1417",
    img: "https://robohash.org/eamagnamdicta.png?size=20x20&set=set1",
    adressF: "168 Hanson Way"
  },
  {
    nomF: "Bretelle",
    prenomF: "Beauregard",
    teleF: "447-366-3414",
    img: "https://robohash.org/hicundeaccusantium.png?size=20x20&set=set1",
    adressF: "9619 American Ash Place"
  },
  {
    nomF: "Cardus",
    prenomF: "Abelard",
    teleF: "820-325-1111",
    img: "https://robohash.org/officiarepellendusnecessitatibus.png?size=20x20&set=set1",
    adressF: "73 Loeprich Trail"
  },
  {
    nomF: "Bellard",
    prenomF: "Hoyt",
    teleF: "516-554-9318",
    img: "https://robohash.org/quiasitet.png?size=20x20&set=set1",
    adressF: "5 Sugar Junction"
  }
]
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