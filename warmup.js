const Title = "My First Note";
const isPinned = false;
const tags = ["personal", "todo"];
 
console.log(Title, typeof Title);
console.log(isPinned, typeof isPinned);
console.log(tags, typeof tags);



const makeNote = (title, content) => {
  return { title, content, createdAt: new Date() };
};
 
console.log(makeNote("Groceries", "Milk, eggs, bread"));


const notes = [
  { title: "Groceries", content: "Milk, eggs" },
  { title: "Workout", content: "Legs day" },
  { title: "Reading", content: "Finish chapter 3" },
];
 
const titles = notes.map(note => note.title);
console.log(titles);

const { title, content } = notes[0];
console.log(`${title}: ${content}`);


async function getSampleData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log(data);
}
 
getSampleData();

