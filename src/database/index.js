import mongoose from 'mongoose';

mongoose.connect('mongodb://root:root@localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
