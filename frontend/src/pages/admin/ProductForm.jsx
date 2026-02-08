import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader } from "lucide-react";
import api from "../../services/api";

const ProductForm = () => {
  const { id } = useParams(); // This is the string ID (slug) if editing
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    subtitle: "",
    price: "",
    weight: "",
    category: "dried",
    description: "",
    image: "",
    stockQuantity: 0,
    featured: false,
    inStock: true,
    benefits: "", // comma separated
    uses: "", // comma separated
    ingredients: "", // comma separated
  });

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      const product = data.data;

      setFormData({
        ...product,
        benefits: product.benefits ? product.benefits.join(", ") : "",
        uses: product.uses ? product.uses.join(", ") : "",
        ingredients: product.ingredients ? product.ingredients.join(", ") : "",
      });
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product details");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Process array fields
      const processedData = {
        ...formData,
        price: Number(formData.price),
        stockQuantity: Number(formData.stockQuantity),
        benefits: formData.benefits
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        uses: formData.uses
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        ingredients: formData.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (isEditMode) {
        await api.put(`/products/${id}`, processedData);
      } else {
        await api.post("/products", processedData);
      }

      navigate("/admin/products");
    } catch (err) {
      console.error("Error saving product:", err);
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <Link
        to="/admin/products"
        className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unique ID (Slug)</label>
            <input
              type="text"
              name="id"
              required
              disabled={isEditMode}
              placeholder="e.g. xilikha-dried"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none ${isEditMode ? "bg-gray-100" : ""}`}
              value={formData.id}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Unique identifier for URL (cannot be changed later)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white font-sans"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="dried">Dried</option>
              <option value="tea">Tea</option>
              <option value="salted">Salted</option>
              <option value="honey">Honey/Liquid</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              required
              placeholder="Short description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.subtitle}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
            <input
              type="text"
              name="weight"
              required
              placeholder="e.g. 100g"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            required
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
            value={formData.image}
            onChange={handleChange}
          />
          {formData.image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img
                src={formData.image}
                alt="Preview"
                className="h-32 rounded-lg border border-gray-200 object-cover"
              />
            </div>
          )}
        </div>

        {/* Arrays */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Benefits (comma separated)
            </label>
            <textarea
              name="benefits"
              rows="2"
              placeholder="Immunity boosting, Digestion help, Skin health"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.benefits}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Uses (comma separated)
            </label>
            <textarea
              name="uses"
              rows="2"
              placeholder="Eat raw, Mix with water"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.uses}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients (comma separated)
            </label>
            <textarea
              name="ingredients"
              rows="2"
              placeholder="Haritaki, Salt"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.ingredients}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Inventory & Status */}
        <div className="border-t border-gray-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.stockQuantity}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-gray-900 font-medium">In Stock</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-gray-900 font-medium">Featured Product</span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 px-8"
          >
            {loading && <Loader size={18} className="animate-spin" />}
            {isEditMode ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
