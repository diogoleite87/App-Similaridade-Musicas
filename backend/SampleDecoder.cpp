/*
 * SampleDecoder.cpp
 *
 * For more information, see SampleDecoder.h
 *
 * Created on : Nov 17, 2011 by rtoso
 * Authors    : Rodrigo Franco Toso <rtoso@cs.rutgers.edu>
 *              Mauricio G.C. Resende <mgcr@research.att.com>
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2018
 * Rodrigo Franco Toso (rfrancotoso@gmail.com) and
 * Mauricio G.C. Resende
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

#include "SampleDecoder.h"
#include "Data.h"
#include <iostream>
#include <string>

using namespace std;

extern int m;
extern float mat[10000][10000];

SampleDecoder::SampleDecoder() {}

SampleDecoder::~SampleDecoder() {}

std::list<unsigned> SampleDecoder::getSolution(const std::vector<double> &chromosome) const
{
	typedef std::pair<double, unsigned> ValueKeyPair;
	std::vector<ValueKeyPair> rank(chromosome.size());

	for (unsigned i = 0; i < chromosome.size(); ++i)
	{
		rank[i] = ValueKeyPair(chromosome[i], i);
		// myFitness += (double(i + 1) * chromosome[i]);
	}

	// Here we sort 'permutation', which will then produce a permutation of [n]
	// stored in ValueKeyPair::second:
	std::sort(rank.begin(), rank.end());

	std::list<unsigned> permutation;
	for (std::vector<ValueKeyPair>::const_iterator i = rank.begin(); i != rank.begin() + m; ++i)
	{
		permutation.push_back(i->second);
	}

	return permutation;
}

void SampleDecoder::printSolution(const std::vector<double> &chromosome) const
{

	std::list<unsigned> permutation = this->getSolution(chromosome);

	FILE *resultadoSemelhantesFile = fopen("resultadoSemelhantes.txt", "w");

	printf("\nMelhores soluções: ");
	for (std::list<unsigned>::const_iterator i = permutation.begin(); i != permutation.end(); ++i)
	{
		printf("\n%i", *i);
		fprintf(resultadoSemelhantesFile, "%d\n", *i);
	}

	fclose(resultadoSemelhantesFile);

	printf("\n\n");
}

// Runs in O(n \log n):
double SampleDecoder::decode(const std::vector<double> &chromosome) const
{
	double myFitness = 0.0;

	std::list<unsigned> permutation = this->getSolution(chromosome);

	for (std::list<unsigned>::const_iterator i = permutation.begin(); i != permutation.end(); ++i)
	{

		for (std::list<unsigned>::const_iterator j = i; j != permutation.end(); ++j)
		{
			myFitness = myFitness + mat[*i][*j];
		}
	}

	// Return the fitness:
	return myFitness;
}
