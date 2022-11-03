import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${params.bookId}`)
      .then((resBook) => {
        console.log("resBook", resBook);
        setBookname(resBook.data.name);
        setAuthor(resBook.data.author);
        setIsbn(resBook.data.isbn);
        setPublisher(resBook.data.publisher);
        setCategory(resBook.data.categoryId);
        setImage(resBook.data.image);

        axios
          .get("http://localhost:3004/categories")
          .then((resCat) => {
            console.log("resCat", resCat);
            setCategories(resCat.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [params.bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook();
  };
  const editBook = () => {
    if (bookname === "" || author === "" || category === "") {
      alert("Kitap Adı, Yazar Adı ve Kategori boş bırakılamaz!");
      return;
    }

    const updateBook = {
      id: params.bookId,
      name: bookname,
      author: author,
      isbn: isbn,
      publisher: publisher,
      categoryId: category,
      image: image,
    };
    console.log("updateBook", updateBook);

    axios
      .put(`http://localhost:3004/books/${params.bookId}`, updateBook)
      .then((resBook) => {
        console.log("resBook", resBook);
        navigate("/");
      })
      .catch((err) => console.log("resbook err", err));
  };

  if (categories === null) {
    return <Loading />;
  }

  return (
    <div className="edit-book">
      <form onSubmit={handleSubmit} className="add-book container py-4">
        <h3
          style={{ fontWeight: "700", color: "##256D85" }}
          className="text-center mb-4"
        >
          Kitap Güncelle
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
        </div>
        <div className="row ">
          <div className="col d-flex justify-content-center">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="form-select form-select-sm text-center w-50"
            >
              <option defaultValue={""}>Kategori Seçiniz</option>
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
            // style={{ background: "#256D85", color: "#DFF6FF" }}
            className="btn btn-sm btn-outline-primary me-2 w-50"
            type="submit"
          >
            Güncelle
          </button>
          <Link
            onClick={() => navigate("/")}
            to="/"
            // style={{ background: "#06283D", color: "#DFF6FF" }}
            className="btn btn-sm btn-outline-danger w-50"
          >
            Vazgeç
          </Link>
        </div>
      </form>
    </div>
  );
};
export default EditBook;
