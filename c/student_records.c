#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Student {
    int id;
    char name[100];
    struct Student *next;
} Student;

Student *head = NULL;

// Add a student to the linked list
void add_student(const char *name, int id) {
    Student *new_student = (Student *)malloc(sizeof(Student));
    if (new_student == NULL) {
        printf("Memory allocation failed.\n");
        return;
    }
    strcpy(new_student->name, name);
    new_student->id = id;
    new_student->next = head;
    head = new_student;
}

// List all students
void list_students() {
    Student *current = head;
    if (current == NULL) {
        printf("No students found.\n");
        return;
    }
    while (current != NULL) {
        printf("ID: %d, Name: %s\n", current->id, current->name);
        current = current->next;
    }
}

// Delete a student by ID
void delete_student(int id) {
    Student *current = head;
    Student *previous = NULL;

    while (current != NULL) {
        if (current->id == id) {
            if (previous == NULL) { // Deleting the head of the list
                head = current->next;
            } else {
                previous->next = current->next;
            }
            free(current);
            printf("Student with ID %d deleted successfully.\n", id);
            return;
        }
        previous = current;
        current = current->next;
    }
    printf("Student with ID %d not found.\n", id);
}

int main(int argc, char *argv[]) {
    if (argc == 4 && strcmp(argv[1], "add") == 0) {
        int id = atoi(argv[2]);
        add_student(argv[3], id);
        printf("Student added: %s, ID: %d\n", argv[3], id);
    } else if (argc == 2 && strcmp(argv[1], "list") == 0) {
        list_students();
    } else if (argc == 3 && strcmp(argv[1], "delete") == 0) {
        int id = atoi(argv[2]);
        delete_student(id);
    } else {
        printf("Usage:\n");
        printf("  To add a student: %s add <id> <name>\n", argv[0]);
        printf("  To list students: %s list\n", argv[0]);
        printf("  To delete a student: %s delete <id>\n", argv[0]);
    }
    return 0;
}