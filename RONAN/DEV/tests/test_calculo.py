import unittest
import sys
import os

# Ajusta o path para importar calculo.py quando os testes são executados
HERE = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, HERE)

from calculo import calcular_desconto, normalize_number_string, format_brl


class TestCalculo(unittest.TestCase):
    def test_calcular_desconto_basico(self):
        desconto, final = calcular_desconto(100.0, 0.10)
        self.assertAlmostEqual(desconto, 10.0)
        self.assertAlmostEqual(final, 90.0)

    def test_normalize_number_string_variants(self):
        self.assertEqual(normalize_number_string('1.234,56'), '1234.56')
        self.assertEqual(normalize_number_string('1234.56'), '1234.56')
        self.assertEqual(normalize_number_string('R$ 1.234,56'), '1234.56')
        self.assertEqual(normalize_number_string('1,234.56'), '1234.56')

    def test_format_brl(self):
        self.assertEqual(format_brl(1234.56), 'R$ 1.234,56')


if __name__ == '__main__':
    unittest.main()
