const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient,Prisma  } = require('@prisma/client');


const prisma = new PrismaClient();

const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/referrer', async (req, res) => {
  const { name, email, phone, referee } = req.body;
  try {
    const referrer = await prisma.referrer.create({
      data: {
        name,
        email,
        phone,
        referee,
      },
    });
    res.status(200).json(referrer);
  } catch (error) {
    console.error('Error saving referrer data:', error);
    res.status(500).json({ error: 'Error saving referrer data' });
  }
});


app.post('/api/referee', async (req, res) => {
  const { name, email, phone, referrer } = req.body; 
  try {
    const refereeData = await prisma.referee.create({
      data: {
        name,
        email,
        phone,
        referrer,     
       },
    });
    res.status(201).json(refereeData);
  } catch (error) {
    console.error('Error saving referrer data:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma Error Code:', error.code);
      console.error('Error Meta:', error.meta);
    }
    res.status(500).json({ error: 'Error saving referrer data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
