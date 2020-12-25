import moment from "moment/dist/moment";

export default {
  toInt(_val) {
    return parseInt(_val);
  },
  createRgbaString(_colorPickerObject){
    let rgba = _colorPickerObject.rgba;
    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
  },
  exportObjectAsFile(content,fileName,contentType){
    let a = document.createElement("a");
    let file = new Blob([JSON.stringify(content)], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  },
  createDateTimePrefixedFileName(_filename){
    return moment().format('YYYYMMDD_HHmmss') + '_' + _filename;
  },
  sortArrayBySingleObjProperty(_array,_property,_direction){
    let arrayCopy = [..._array];
    if(_direction === 'ascending'){
      return arrayCopy.sort((a,b) => (a[_property] > b[_property]) ? 1 : -1)
    } else {
      return arrayCopy.sort((a,b) => (a[_property] < b[_property]) ? 1 : -1)
    }
  },
  filterArrayByObjPropertyValue(_array,_property,_value){
    let arrayCopy = [..._array];
    return arrayCopy.filter( (y)=> {return y[_property] === _value} );
  },
  camelKeyToWords(_value){
    let newText = _value.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
    return newText.charAt(0).toUpperCase() + newText.substr(1);
  },
  searchArrayByPropertyReturnKey(_array,_property,_value){
    let i, key = false;
    for (i = 0 && !key; i < _array.length; i++) {
      if(_array[i][_property] === _value) {
        key = i;
      }
    }
    return key;
  },
  toMoment(dateString,format){
    if (dateString.length === 14 && dateString.match(/^[0-9]+$/)) {
      return moment((new Date(dateString.substring(0, 4), dateString.substring(5, 6), dateString.substring(7, 8), dateString.substring(9, 10), dateString.substring(11, 12), dateString.substring(13, 14)))).format(format).replace('Invalid date', '');
    } else {
      return moment(dateString).zoneName('US/Pacific').format(format).replace('Invalid date', '');
    }
  },
  toMomentFromNow(dateString){
    if (!dateString) return '';
    if (dateString.length === 14 && dateString.match(/^[0-9]+$/)) {
      return moment((new Date(dateString.substring(0, 4), dateString.substring(5, 6), dateString.substring(7, 8), dateString.substring(9, 10), dateString.substring(11, 12), dateString.substring(13, 14)))).zoneName('US/Pacific').fromNow();
    } else {
      return moment.utc(dateString).fromNow();
    }
  },
  toMomentLocal(dateString,format){
    if (!dateString || !dateString.length) return '';
    return moment.zoneName(dateString, Intl.DateTimeFormat().resolvedOptions().timeZone).format(format).replace('Invalid date', '');
  }
}
