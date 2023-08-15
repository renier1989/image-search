import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";

export const App = () => {
  const input = useRef();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrestPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searching, setSearching] = useState("");

  const open = (url) => window.open(url);

  const fetchPhotos = async (searchValues, page) => {
    console.log('entre here');
    // console.log(searchValues,page);
    // console.log("searchig:", searching, "searchValues", searchValues);
    if (searching && searchValues !== searching) {
      setPhotos([]);
    }
    

    setLoading(true);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?per_page=20&page=${page}&query=${searchValues}`,
      {
        headers: {
          Authorization:
            "Client-ID D7KDpnlmqpYX4xC1hu7MNqf9jx7R61Fcb9kCar4ZGaM",
        },
      }
    );

    const data = await response.json();
    setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
    setTotalPages(data.total_pages);
    setSearching(searchValues);
    setLoading(false);
  };

  useEffect(() => {
    input.current.focus();
    if (currentPage > 1) {
      // console.log('algo');
      fetchPhotos(searching, currentPage);
    }
  }, [currentPage]);

  const submitApi = async (values) => {
    setLoading(true);
    setCurrestPage(1);
    fetchPhotos(values.search, 1);
  };
  const loadMorePhotos = () => {
    // console.log(currentPage, totalPages)
    if (currentPage < totalPages) {
      setCurrestPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="">
      <header className="flex w-full justify-center p-5 shadow-lg relative z-10">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => submitApi(values)}
        >
          <Form className="flex w-full">
            <Field
            
              innerRef={input}
              name="search"
              className="flex w-full justify-center items-center text-center outline-none cursor-pointer text-[40px]"
              autoComplete="off"
              placeholder="Type here ⌨"
            />
          </Form>
        </Formik>
      </header>
      <div
        className={`flex bg-[#eee] justify-center ${
          photos.length ? "pb-10" : null
        }`}
      >
        {/* <span>{loading ? <p>Cargando...</p> : <p>nada</p> }</span> */}
        <div className="columns-3 w-[1200px] ">
          {photos.map((photo) => (
            <article
              className="inline-block mt-7 mx-7 transition-shadow ease-in-out bg-white rounded-lg hover:shadow-lg duration-500 cursor-pointer"
              key={photo.id}
              onClick={() => open(photo.links.html)}
            >
              <img
                className="w-[370px] rounded-t-lg "
                src={photo.urls.regular}
                alt={photo.alt_description}
              />
              <p className="px-3 py-2">
                {[photo.desctiption, photo.alt_description].join(" ⚡ ")}
              </p>
            </article>
          ))}
        </div>
      </div>
        {photos.length && currentPage < totalPages ? (
          <div className="flex bg-[#eee] justify-center pb-3">
            <button className="px-4 py-2 bg-slate-400 rounded-md font-semibold text-white" onClick={loadMorePhotos}>ver mas</button>
          </div>
        ) : null}
    </div>
  );
};
