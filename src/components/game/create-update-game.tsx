import { UserCircleIcon } from "@heroicons/react/24/solid"
// import { useState } from "react"
// import { Cloudinary } from "@cloudinary/url-gen"
// import UploadWidget from "./upload-widget"

type CreateUpdateGameProps = {
  gameTitle: string
  gameDescription: string
  newGameGenres: string[]
  newGamePlayerSupport: string[]
  genresList: string[]
  playerSupportList: string[]
  thumbnail: string
  images: string[]
  developer: string
  releaseDate: Date
  systemRequirements: string
  price: number
  handlenewGameChanges: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
  handleRemoveImage: (image: string) => void
  handleCancel: () => void
  handleSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function CreateUpdateGameForm({
  gameTitle,
  gameDescription,
  newGameGenres,
  newGamePlayerSupport,
  genresList,
  playerSupportList,
  thumbnail,
  images,
  developer,
  releaseDate,
  systemRequirements,
  price,
  handlenewGameChanges,
  handleRemoveImage,
  handleCancel,
  handleSave
}: CreateUpdateGameProps) {
  // const [publicId, setPublicId] = useState("")
  // const [cloudName] = useState("dtoob7izs")
  // const [uploadPreset] = useState("aoh4fpwm")
  // const [uwConfig] = useState({
  //   cloudName,
  //   uploadPreset
  // })
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName
  //   }
  // })

  // const myImage = cld.image(publicId)

  return (
    <form className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-6">
        <div className="border-b border-gray-300 pb-6">
          <h2 className="text-2xl font-bold text-gray-900">New Game</h2>
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="game_title" className="block text-sm font-medium text-gray-700">
              Game Title
            </label>
            <input
              id="name"
              name="name"
              value={gameTitle}
              onChange={handlenewGameChanges}
              type="text"
              placeholder="Assassin's Creed"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={gameDescription}
              onChange={handlenewGameChanges}
              placeholder="Assassin's Creed is an action-adventure game series..."
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>

          <div>
            <label htmlFor="genres" className="block text-sm font-medium text-gray-700">
              Select Genres
            </label>
            <select
              id="genreList"
              name="genreList"
              multiple
              value={newGameGenres}
              onChange={handlenewGameChanges}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {genresList.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {newGameGenres &&
                Array.isArray(newGameGenres) &&
                newGameGenres.map((genre, index) => <li key={index}>{genre}</li>)}
            </ul>
          </div>

          <div>
            <label htmlFor="playerSupport" className="block text-sm font-medium text-gray-700">
              Select Player Supports
            </label>
            <select
              id="playerSupport"
              name="playerSupport"
              multiple
              value={newGamePlayerSupport}
              onChange={handlenewGameChanges}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {playerSupportList.map((playerSupport, index) => (
                <option key={index} value={playerSupport}>
                  {playerSupport}
                </option>
              ))}
            </select>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {newGamePlayerSupport.map((support: string, index: number) => (
                <li key={index}>{support}</li>
              ))}
            </ul>
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <div className="mt-2 flex items-center">
              {thumbnail ? (
                <img
                  src={thumbnail as string}
                  alt="Thumbnail"
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon aria-hidden="true" className="h-16 w-16 text-gray-300" />
              )}
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={handlenewGameChanges}
                className="sr-only"
              />
              <button
                type="button"
                className="ml-4 px-3 py-1.5 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                onClick={() => document.getElementById("thumbnail")?.click()}
              >
                Change
              </button>
            </div>
          </div>

          {/* <UploadWidget /> */}

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {images.map((image: string, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                      onClick={() => handleRemoveImage(image)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handlenewGameChanges}
                className="mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="developer" className="block text-sm font-medium text-gray-700">
              Developer
            </label>
            <input
              id="developer"
              name="developer"
              type="text"
              value={developer}
              onChange={handlenewGameChanges}
              placeholder="Nintendo Co."
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>

          <div>
            <label htmlFor="release_date" className="block text-sm font-medium text-gray-700">
              Release Date
            </label>
            <input
              type="date"
              name="releaseDate"
              value={releaseDate instanceof Date ? releaseDate.toISOString().split("T")[0] : ""}
              onChange={handlenewGameChanges}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="system_requirements"
              className="block text-sm font-medium text-gray-700"
            >
              System Requirements
            </label>
            <input
              id="system_requirements"
              name="systemRequirements"
              value={systemRequirements}
              onChange={handlenewGameChanges}
              type="text"
              placeholder="Windows 11, Intel Core i7, 16 GB RAM, RTX 3060, 30 GB storage"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              value={price}
              onChange={handlenewGameChanges}
              type="number"
              placeholder="59.99"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            type="button"
            className="text-sm font-semibold text-gray-900 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
