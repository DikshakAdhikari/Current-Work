const Queue= require("bull")
const path= require("path")

const emailQueue = new Queue("emailQueue", {
    redis: { port: 6379, host: "127.0.0.1" },
  });


 emailQueue.process(path.join(__dirname, "processEmail.js"))


// emailQueue.on("completed", (job) => {
//     console.log(`Completed #${job.id} Job`);
//   });
  