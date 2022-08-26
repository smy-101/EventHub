import { EventHub } from "../src";

type TestCase = (message: string) => void;

const test1: TestCase = (message) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true, "eventHub是个对象");
  console.log(message);
};

//on,emit
const test2: TestCase = (message) => {
  const eventHub = new EventHub();
  let called = false;
  eventHub.on("xxx", (v: unknown) => {
    called = true;
    console.assert(v === "zzzzzzzzzz");
  });

  eventHub.emit("xxx", "zzzzzzzzzz");
  setTimeout(() => {
    console.assert(called === true);
    console.log(message);
  }, 1000);
};

const test3: TestCase = (message) => {
  const eventHub = new EventHub();
  let called = false;
  const fn1 = () => {
    called = true;
  };
  eventHub.on("yyy", fn1);
  eventHub.off("yyy", fn1);

  eventHub.emit("yyy");
  setTimeout(() => {
    console.assert(called === false);
    console.log(message);
  }, 1000);
};

test1("EventHub可以创建对象");
test2("EventHub的on和emit功能正常");
test3("EventHub的off功能正常");
