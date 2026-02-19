import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import AppContent from "./components/AppContent";

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <AppContent />
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
