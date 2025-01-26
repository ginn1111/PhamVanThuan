import SwapForm from "./components/SwapForm";

const App = () => {
  return (
    <main className="p-8 relative border-2 border-primary rounded-3xl">
      <div className="absolute inset-[-2px] backdrop-blur-md rounded-2xl" />
      <SwapForm />
    </main>
  );
};

export default App;
