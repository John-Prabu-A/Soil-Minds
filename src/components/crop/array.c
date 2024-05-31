#include <stdio.h>
#define MAX_SIZE 100

int tree[MAX_SIZE];
int size = 0;

void insert(int value, int index) {
    if (tree[index] == 0) {
        tree[index] = value;
        size++;
        return;
    }
    if (value < tree[index]) {
        insert(value, 2 * index + 1);
    } else {
        insert(value, 2 * index + 2);
    }
}

int minValueNode(int index) {
    while (tree[2 * index + 1] != 0) {
        index = 2 * index + 1;
    }
    return index;
}

void deleteNode(int value, int index) {
    if (tree[index] == 0) {
        printf("Value not found\n");
        return;
    }
    if (value < tree[index]) {
        deleteNode(value, 2 * index + 1); 
    } else if (value > tree[index]) {
        deleteNode(value, 2 * index + 2);
    } else {
        if (tree[2 * index + 1] == 0 && tree[2 * index + 2] == 0) {
            tree[index] = 0;
        } else if (tree[2 * index + 1] == 0) {
            tree[index] = tree[2 * index + 2];
            deleteNode(tree[2 * index + 2], 2 * index + 2);
        } else if (tree[2 * index + 2] == 0) {
            tree[index] = tree[2 * index + 1];
            deleteNode(tree[2 * index + 1], 2 * index + 1);
        } else {
            int minRight = minValueNode(2 * index + 2);
            tree[index] = tree[minRight];
            deleteNode(tree[minRight], minRight);
        }
        printf("Element deleted successfully\n");
        size--;
    }
}

void inorderTraversal(int index) {
    if (index < MAX_SIZE && tree[index] != 0) {
        inorderTraversal(2 * index + 1); 
        printf("%d ", tree[index]);
        inorderTraversal(2 * index + 2); 
    }
}

void preorderTraversal(int index) {
    if (index < MAX_SIZE && tree[index] != 0) {
        printf("%d ", tree[index]);
        preorderTraversal(2 * index + 1); 
        preorderTraversal(2 * index + 2); 
    }
}

void postorderTraversal(int index) {
    if (index < MAX_SIZE && tree[index] != 0) {
        postorderTraversal(2 * index + 1); 
        postorderTraversal(2 * index + 2); 
        printf("%d ", tree[index]);
    }
}

int main() {
    int choice, value;

    do {
        printf("\n1. Insert\n2. Delete\n3. In-order Traversal\n4. Pre-order Traversal\n5. Post-order Traversal\n6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                if (size >= MAX_SIZE) {
                    printf("Tree is full. Cannot insert.\n");
                } else {
                    printf("Enter value to insert: ");
                    scanf("%d", &value);
                    insert(value, 0);
                }
                break;
            case 2:
                printf("Enter value to delete: ");
                scanf("%d", &value);
                deleteNode(value, 0);
                break;
            case 3:
                printf("In-order Traversal: ");
                inorderTraversal(0);
                printf("\n");
                break;
            case 4:
                printf("Pre-order Traversal: ");
                preorderTraversal(0);
                printf("\n");
                break;
            case 5:
                printf("Post-order Traversal: ");
                postorderTraversal(0);
                printf("\n");
                break;
            case 6:
                printf("Exiting...\n");
                break;
            default:
                printf("Invalid choice!\n");
        }
    } while (choice != 6);

    return 0;
}