
import { useSignal } from "@preact/signals";
import Phonetics from "../components/Phonetics.tsx";
import Meanings from "../components/Meanings.tsx";

export default function Search() {
  const word = useSignal(""); // Reemplazo de useState
  const data = useSignal<any>(null);

  const searchWord = async (e: Event) => {
    e.preventDefault();
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`);
    const json = await res.json();
    data.value = json[0];
  };

  return (
    <div>
      <h1>Buscar Palabra</h1>
      <form onSubmit={searchWord}>
        <input type="text" value={word.value} onInput={(e) => (word.value = e.currentTarget.value)} />
        <button type="submit">Buscar</button>
      </form>
      {data.value && (
        <>
          <Phonetics phonetics={data.value.phonetics} />
          <Meanings meanings={data.value.meanings} />
        </>
      )}
    </div>
  );
}
