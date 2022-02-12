import { BehaviorSubject } from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage'
const permissions = new BehaviorSubject({})
const editableCamera = new BehaviorSubject(getEditable('CAMERA'))
const editableNotifications = new BehaviorSubject(getEditable('NOTIFICATIONS'))
const editableLocation = new BehaviorSubject(getEditable('LOCATION'))

export const permissionService = {
    setPermission,
    setEditable,
    permissionSubscribe: permissions.asObservable(),
    editableCamera: editableCamera.asObservable(),
    editableNotifications: editableNotifications.asObservable(),
    editableLocation: editableLocation.asObservable(),
    get permissions() { return permissions.value },
    get getEditableCamera() { return editableCamera.value },
    get getEditableNotifications() { return editableNotifications.value },
    get getEditableLocation() { return editableLocation.value }
}

async function setPermission(permission, value) 
{
    var persistentValues = await AsyncStorage.getItem('permissions')
    persistentValues = JSON.parse(persistentValues)
    let x = persistentValues ? persistentValues : {}
    x[permission] = value
    console.log("X", x)
    await AsyncStorage.setItem('permissions', JSON.stringify(x))
    permissions.next(x)
}

async function setEditable(key,value) 
{
    await AsyncStorage.setItem(key, value.toString())
    console.log("SETING EDITABLE", key, value)
    
    switch(key) 
    {
        case 'CAMERA':
                editableCamera.next(value)
                break
        case 'NOTIFICATIONS':
                editableNotifications.next(value)
                break
        case 'LOCATION':
                editableLocation.next(value)
                break        
    }
}

async function getEditable(key)
{
    console.log("Calling editable")
    let value = await AsyncStorage.getItem(key)
    console.log("Getting editable", key, value)
    switch(key) {
        case 'CAMERA':
            if(value == 'true')
            {
                editableCamera.next(true)
            }
            else
            {
                editableCamera.next(false)
            }
            break

        case 'NOTIFICATIONS':
            if(value == 'true')
            {
                editableNotifications.next(true)
            }
            else
            {
                editableNotifications.next(false)
            }
            break

        case 'LOCATION':
            if(value == 'true')
            {
                editableLocation.next(true)
            }
            else
            {
                editableLocation.next(false)
            }
            break
    }
}