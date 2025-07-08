import unittest
from ..main import app
from fastapi.testclient import TestClient

class TestPrediction(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_predict_endpoint(self):
        # Replace with actual test data
        test_data = {"features": [1, 2, 3, 4]}
        response = self.client.post("/predict", json=test_data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("prediction", response.json())

if __name__ == "__main__":
    unittest.main()