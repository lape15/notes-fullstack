//server.js
import app from './app';
const port = process.env.PORT || 5000; //Line 3

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
