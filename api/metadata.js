export default function handler(req, res) {

  const id = req.query.id;

  const metadata = {
    name: "MASIVO NFT #" + id,
    description: "MASIVO METAVERSE NFT Collection",
    image: "https://raw.githubusercontent.com/1MASIVO1/MASIVO-METAVERSE/main/images/" + id + ".png",
    attributes: [
      {
        trait_type: "Collection",
        value: "MASIVO GENESIS"
      }
    ]
  };

  res.status(200).json(metadata);

}
