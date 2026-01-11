#include <stdio.h>
#include <string.h>

int main() {

    // 1) Open the CSV file
    FILE *file = fopen("expenses.csv", "r");

    // If file is not found
    if (file == NULL) {
        printf("File not found!\n");
        printf("Please export expenses.csv from dashboard.\n");
        return 0;
    }

    char line[200];

    // total amount spent
    float total = 0;

    // totals for categories
    float food = 0;
    float travel = 0;
    float shopping = 0;
    float other = 0;

    // 2) Skip first line (header line)
    fgets(line, 200, file);

    // 3) Read each expense line
    while (fgets(line, 200, file)) {

        float amount;
        char category[50];
        char note[50];

        // Example CSV line:
        // 50,Food,Tea

        // Read amount, category, note from the line
        sscanf(line, "%f,%49[^,],%49[^\n]", &amount, category, note);

        // add to total
        total = total + amount;

        // add to category total
        if (strcmp(category, "Food") == 0) {
            food = food + amount;
        }
        else if (strcmp(category, "Travel") == 0) {
            travel = travel + amount;
        }
        else if (strcmp(category, "Shopping") == 0) {
            shopping = shopping + amount;
        }
        else {
            other = other + amount;
        }
    }

    // 4) Close the file
    fclose(file);

    // 5) Print report
    printf("\n----- Expense Report -----\n");
    printf("Total Spent: %.2f\n", total);

    printf("\nCategory wise total:\n");
    printf("Food: %.2f\n", food);
    printf("Travel: %.2f\n", travel);
    printf("Shopping: %.2f\n", shopping);
    printf("Other: %.2f\n", other);

    printf("\n--------------------------\n");

    return 0;
}
