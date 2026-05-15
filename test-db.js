const mongoose = require('mongoose');

const uri = 'mongodb+srv://faridafaijati:Nabumi2022@cluster0.qn4b4yn.mongodb.net/?appName=Cluster0';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(uri)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB Atlas!');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILURE: Could not connect to MongoDB Atlas.');
    console.error('Error details:', err.message);
    if (err.message.includes('IP')) {
      console.error('TIP: Check your Atlas IP Whitelist (Network Access).');
    }
    process.exit(1);
  });
