export default function handler(req, res) {

  const id = req.query.id;

  const metadata = {
    name: "NFT #" + id,
    description: "Mi colección NFT",
    image: "https://raw.githubusercontent.com/TU-USUARIO/TU-REPO/main/images/" + id + ".png",
    attributes: [
      {
        trait_type: "Collection",
        value: "Genesis"
      }
    ]
  };

  res.status(200).json(metadata);

}
