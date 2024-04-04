import clsx from "clsx";

export function PokemonEntry(props: { alternate: boolean }) {
  return (
    <div
      className={clsx(
        "w-full flex",
        { "flex-col sm:flex-row": !props.alternate },
        { "flex-col-reversed sm:flex-row-reverse": props.alternate },
      )}
    >
      <div className="w-full h-72 bg-transparent flex flex-row items-center justify-end p-8"></div>
      <div
        className={clsx(
          "w-full h-72 gap-2 bg-details-bg-lt dark:bg-details-bg-dt flex justify-start items-center p-8",
        )}
      >
        <div className="w-full h-full rounded-xl flex justify-center items-start flex-col">
          <h2 className="font-semibold text-lg mb-2">#0001 Bulbasaur</h2>
          <span className="flex gap-1 mb-1 text-[0.65rem]">
            <p className="font-bold">Health Points:</p>
            <p className="">45 HP</p>
          </span>
          <span className="flex gap-1 mb-1 text-[0.65rem]">
            <p className="font-bold">Height:</p>
            <p className="">70 cm</p>
          </span>
          <span className="flex gap-1 mb-1 text-[0.65rem]">
            <p className="font-bold">Weight:</p>
            <p className="">69 kg</p>
          </span>
          <span className="flex gap-1 mb-1 items-center text-[0.64rem]">
            <p className="font-bold mr-1">Type:</p>
            <TypeBadge type="poison" />
            <TypeBadge type="grass" />
          </span>
          <div className="mb-1 text-[0.65rem]">
            <span className="font-bold">Details: </span>
            <span className="">
              A strange seed was planted on its back at birth. The plant sprouts
              and grows with this POKéMON.
            </span>
          </div>
        </div>
        <div className="bg-blue-500/10 w-full h-full rounded-xl hidden lg:flex"></div>
      </div>
    </div>
  );
}

type TypeBadgeProps = {
  type:
    | "normal"
    | "fighting"
    | "flying"
    | "poison"
    | "ground"
    | "rock"
    | "bug"
    | "ghost"
    | "steel"
    | "fire"
    | "water"
    | "grass"
    | "electric"
    | "psychic"
    | "ice"
    | "dragon"
    | "dark"
    | "fairy"
    | "unknown"
    | "shadow";
};

function TypeBadge(props: { type: TypeBadgeProps["type"] }) {
  return (
    <p
      className={clsx(
        "text-[0.5rem] dark:text-text-lt text-text-dt px-2 rounded-full",
        "bg-type-" + props.type,
      )}
    >
      {props.type}
    </p>
  );
}
