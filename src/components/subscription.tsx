import { AtSign, CircleUser } from "lucide-react";
import { FormEvent, useState } from "react";
import { Input } from "./input";

export function Subscription() {
  const [name, setName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");

  function onHandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (name === "" || email === "") return;

    const eventId = "b8cdf168-97bc-4702-961d-d4d630be0a7b";
    const url = `http://localhost:3333/events/${eventId}/attendees`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((response) => response.json());
  }

  return (
    <div className="flex flex-col w-full border-y border-white/20 py-5 gap-3">
      <h1 className="text-2xl font-bold">Inscrição</h1>
      <form
        onSubmit={onHandleSubmit}
        className="flex items-center gap-3 justify-between"
      >
        <div className="flex items-center gap-3">
          <Input
            id="name"
            type="text"
            placeholder="Nome completo"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
            Icon={CircleUser}
          />
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            Icon={AtSign}
          />
        </div>
        <button className="px-3 py-2 rounded-lg bg-orange-400 text-green-dark text-xs font-bold uppercase hover:bg-orange-400/80 transition-all">
          Realizar inscrição
        </button>
      </form>
    </div>
  );
}
