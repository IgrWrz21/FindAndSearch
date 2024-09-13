import { forwardRef, useState } from "react";
import { TbMapPinSearch } from "react-icons/tb";
import { Autocomplete } from "@react-google-maps/api";
const AutoCompleteComponent = forwardRef(function AutoCompleteComponent(
  { map },
  ref
) {
  const [autocomplete, setAutocomplete] = useState(null);
  const handlePlaceChanged = () => {
    const { geometry } = autocomplete.getPlace();
    const bounds = new window.google.maps.LatLngBounds();
    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }
    map.fitBounds(bounds);
  };
  return (
    <>
      <label
        htmlFor="place"
        className="flex items-center justify-center gap-2 leading-tight text-center "
      >
        <TbMapPinSearch className="text-3xl text-primaryLighter" />
        Search for place!
      </label>
      <Autocomplete
        onLoad={setAutocomplete}
        onPlaceChanged={handlePlaceChanged}
        className="z-50 flex items-center justify-center w-3/4 gap-2"
      >
        <input
          ref={ref}
          type="text"
          name="place"
          placeholder="Enter a location"
          className="w-3/4 p-2 outline outline-primaryDarker outline-2 focus:outline-primary"
        />
      </Autocomplete>
    </>
  );
});
export default AutoCompleteComponent;
