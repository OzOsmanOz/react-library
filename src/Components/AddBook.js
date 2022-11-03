import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AddBook = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((resCat) => {
        // console.log(resCat.data);
        setCategories(resCat.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      bookname === "" ||
      author === "" ||
      isbn === "" ||
      publisher === "" ||
      category === ""
    ) {
      alert(
        "Kitap Adı, Yazar Adı, Isbn, Yayınevi ve Kategori boş bırakılamaz!"
      );
      return;
    }

    const newBook = {
      id: new Date().getTime(),
      name: bookname,
      author: author,
      isbn: isbn,
      publisher: publisher,
      categoryId: category,
      image: image,
    };
    axios
      .post("http://localhost:3004/books", newBook)
      .then((resBook) => {
        console.log("kitap ekle", resBook);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (categories === null) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="add-book container py-4">
      <h3
        style={{ fontWeight: "700", color: "#256D85" }}
        className="text-center mb-4"
      >
        Kitap Ekle
      </h3>
      <div className="row my-3">
        <div className="col">
          <input
            onChange={(e) => setBookname(e.target.value)}
            value={bookname}
            type="text"
            className="form-control form-control-sm text-center"
            placeholder="Kitap Adı"
          />
        </div>
        <div className="col ">
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            className="form-control form-control-sm text-center"
            placeholder="Yazar Adı"
          />
        </div>
      </div>
      <div className="row my-3">
        <div className="col">
          <input
            onChange={(e) => setIsbn(e.target.value)}
            value={isbn}
            type="text"
            className="form-control form-control-sm text-center"
            placeholder="Isbn"
          />
        </div>
        <div className="col">
          <input
            onChange={(e) => setPublisher(e.target.value)}
            value={publisher}
            type="text"
            className="form-control form-control-sm text-center"
            placeholder="Yayınevi"
          />
        </div>
        <div className="col">
          <input
            onChange={(e) => setImage(e.target.value)}
            value={image}
            type="text"
            className="form-control form-control-sm text-center"
            placeholder="Resim
            "
          />
        </div>
      </div>
      <div className="row ">
        <div className="col d-flex justify-content-center">
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="form-select form-select-sm text-center w-50"
          >
            <option value={""} selected>
              Kategori Seçiniz
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="col d-flex justify-content-center my-4">
        <button
          style={{ background: "#47B5FF", color: "#DFF6FF" }}
          className="btn btn-sm btn-primary me-2 w-50"
          type="submit"
        >
          Ekle
        </button>
        <Link
          to="/"
          style={{ background: "#06283D", color: "#DFF6FF" }}
          className="btn btn-sm btn-danger w-50"
        >
          Vazgeç
        </Link>
      </div>
    </form>
  );
};
export default AddBook;
