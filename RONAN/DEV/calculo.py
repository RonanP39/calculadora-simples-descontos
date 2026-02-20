"""Calculadora simples de desconto.

Melhorias:
- Função reutilizável `calcular_desconto`
- Validação de entrada (interativa ou via argumentos)
- Suporte a taxa personalizada (porcentagem)
- Formatação adequada de moeda BRL
"""
from typing import Tuple
import argparse


def calcular_desconto(preco: float, taxa: float = 0.10) -> Tuple[float, float]:
	"""Retorna (desconto, preco_final) dado um preço e uma taxa (0.10 = 10%)."""
	desconto = preco * taxa
	preco_final = preco - desconto
	return desconto, preco_final


def normalize_number_string(s: str) -> str:
	"""Normaliza entradas numéricas em formatos comuns BR/EN para parsear como float.

	Exemplos aceitos:
	- 1234.56
	- 1.234,56
	- 1,234.56 (assume ponto decimal quando apenas ponto presente)
	- R$ 1.234,56
	"""
	s = s.replace('R$', '').replace('r$', '').strip()
	if not s:
		return s
	# Se existir tanto '.' quanto ',' detecta o formato pela posição
	if '.' in s and ',' in s:
		# Se a vírgula aparece antes do ponto, provavelmente é formato en-US: '1,234.56'
		if s.find(',') < s.find('.'):
			s = s.replace(',', '')  # remove separador de milhares
		else:
			# formato pt-BR: '1.234,56'
			s = s.replace('.', '').replace(',', '.')
	else:
		s = s.replace(',', '.')
	return s


def format_brl(valor: float) -> str:
	"""Formata um número como moeda BRL, ex: 1.234,56 -> R$ 1.234,56"""
	s = f"{valor:,.2f}"  # ex: 1,234.56
	s = s.replace(',', 'X').replace('.', ',').replace('X', '.')
	return f"R$ {s}"


def obter_preco_interativo(prompt: str = "Digite o preço do produto: ") -> float:
	while True:
		raw = input(prompt)
		norm = normalize_number_string(raw)
		try:
			preco = float(norm)
			if preco < 0:
				print("O preço deve ser um valor não-negativo.")
				continue
			return preco
		except ValueError:
			print("Entrada inválida. Exemplo válido: 49.90 ou 1.234,56")


def main() -> None:
	parser = argparse.ArgumentParser(description="Calcula desconto sobre um preço.")
	parser.add_argument("--preco", "-p", type=str, help="Preço do produto (ex: 49.90 ou 1.234,56)")
	parser.add_argument("--taxa", "-t", type=float, default=10.0, help="Taxa de desconto em porcentagem (padrão 10)")
	args = parser.parse_args()

	taxa = args.taxa / 100.0

	if args.preco:
		norm = normalize_number_string(args.preco)
		try:
			preco = float(norm)
		except ValueError:
			print("Preço inválido nos argumentos. Entrando em modo interativo.")
			preco = obter_preco_interativo()
	else:
		preco = obter_preco_interativo()

	desconto, preco_final = calcular_desconto(preco, taxa)

	print(f"O valor do desconto é: {format_brl(desconto)}")
	print(f"O preço final do produto é: {format_brl(preco_final)}")


if __name__ == "__main__":
	main()