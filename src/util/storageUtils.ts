import AppSecureLocalStorage from '../../lib/largeSecureStore';

export const setItemInStorage = async (key: string, value: string) => {
    try {
        await AppSecureLocalStorage.setItem(key, value);
    } catch (error) {
        console.error('Error setting item in storage:', error);
        // Handle the error appropriately
    }
};

export const getItemFromStorage = async (
    key: string
): Promise<string | null> => {
    try {
        const value = await AppSecureLocalStorage.getItem(key);
        return value;
    } catch (error) {
        console.error('Error retrieving item from storage:', error);

        return null;
    }
};

export const setIsRegisteredFlag = async (isRegistered: boolean) => {
    await setItemInStorage('isRegistered', `${isRegistered}`);
};

export const getIsRegisteredFlag = async () => {
    const isRegistered = await getItemFromStorage('isRegistered');
    return isRegistered;
};
