// category class
export class CategoryState {
    public allCategories: string[] = [];
}

// category enum types
export enum CategoryActionType {
    addCategory = 'addCategory',
    removeCategory = 'removeCategory',
    downloadCategories = 'downloadCategories'
}

// category action structure
export interface CategoryAction {
    type: CategoryActionType,
    payload?: any
}

// category action (functions)
export function addCategoryFunction(newCategory: string): CategoryAction {
    return { type: CategoryActionType.addCategory, payload: newCategory }
}

export function removeCategory(categoryName: string): CategoryAction {
    return { type: CategoryActionType.removeCategory }
}

export function downloadCategoriesFunction(allCategories: string[]): CategoryAction {
    return { type: CategoryActionType.downloadCategories, payload: allCategories }
}

// reducer
export function CategoryReducer(
    currentState: CategoryState = new CategoryState(),
    action: CategoryAction
): CategoryState {
    const newState = { ...currentState };
    switch (action.type) {
        case CategoryActionType.addCategory:
            newState.allCategories = [...newState.allCategories, action.payload];
            break;
        case CategoryActionType.removeCategory:
            newState.allCategories.filter(
                item => item !== action.payload
            )
            break;
        case CategoryActionType.downloadCategories:
            newState.allCategories = action.payload;
            break;
    }
    return newState;
}