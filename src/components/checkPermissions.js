import {
    check,
    request,
    RESULTS,
    requestMultiple,
  } from 'react-native-permissions';
  
  // This function can be used anywhere as it supports multiple permissions. 
  // It checks for permissions and then requests for it.
  export async function checkMultiplePermissions(permissions) {
    let isPermissionGranted = false;
    const statuses = await requestMultiple(permissions);
    for (var index in permissions) {
      if (statuses[permissions[index]] === RESULTS.GRANTED) {
        isPermissionGranted = true;
      } else {
        isPermissionGranted = false;
        break;
      }
    }
    return isPermissionGranted;
  }
  
  // In case you want to check a single permission
  export async function checkPermission(permission) {
    var isPermissionGranted = false;
    const result = await check(permission);
    switch (result) {
      case RESULTS.GRANTED:
        isPermissionGranted = true;
        break;
      case RESULTS.DENIED:
        isPermissionGranted = false;
        break;
      case RESULTS.BLOCKED:
        isPermissionGranted = false;
        break;
      case RESULTS.UNAVAILABLE:
        isPermissionGranted = false;
        break;
    }
    return isPermissionGranted;
  }

  export async function checkResult(result) {
    var checkStatus = false;
    switch (result) {
        case RESULTS.GRANTED:
          checkStatus = true;
          break;
        case RESULTS.DENIED:
          checkStatus = true;
          break;
        case RESULTS.BLOCKED:
          checkStatus = true;
          break;
        case RESULTS.UNAVAILABLE:
          checkStatus = false;
          break;
      }
    return checkStatus;
  }

  export async function checkNotificationStatus(status) {
    var checkStatus = false;
    switch (status) {
        case RESULTS.GRANTED:
          checkStatus = true;
          break;
        case RESULTS.DENIED:
          checkStatus = true;
          break;
        case RESULTS.BLOCKED:
          checkStatus = true;
          break;
        case RESULTS.UNAVAILABLE:
          checkStatus = false;
          break;
      }
    return checkStatus;
  }