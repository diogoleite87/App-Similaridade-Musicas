#include "Data.h"
#include <iostream>

using std::cerr;
using std::cout;
using std::endl;
using std::ifstream;
using std::string;
using std::vector;

using namespace std;

extern int n;
extern float mat[10000][10000];

void makeMtz()
{

//    printf("\nNumero de Musicas: #### %i ####\n", n);

    string filename("distanciasIparaJ.txt");
    vector<string> lines;
    string line;

    int aux1 = 0, aux2 = n, i = 0, j = 0;

    ifstream input_file(filename);
    if (!input_file.is_open())
    {
        cerr << "Could not open the file - '"
             << filename << "'" << endl;
        exit(1);
    }

    while (getline(input_file, line))
    {
        lines.push_back(line);
    }

    for (const auto &k : lines)

        if (aux1 <= aux2)
        {
            // cout << k << endl;
            aux1++;

            mat[i][j] = std::stof(k);

            j++;
            if (aux1 == n)
            {
                i++;
                aux2 += n;
                aux1 = 0;
                j = 0;
            }
        }

//    for (int i = 0; i < n; i++)
//    {
//        printf("\n");
//        for (int j = 0; j < n; j++)
//        {
//            printf(" %.5f", mat[i][j]);
//        }
//    }

    printf("\n\n");

    input_file.close();
}