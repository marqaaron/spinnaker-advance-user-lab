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
  },
  setListItemsForPage: function(_list,_page,_perPage){
    let startPosition =  (_page - 1) * _perPage;
    let endPosition = (_page * _perPage);
    return _list.slice(startPosition,endPosition);
  },
  filterArrayByObjPropertyContainsValue(_array,_property,_value){
    let arrayCopy = [..._array];
    return arrayCopy.filter( (y)=> {
      let value = (y[_property]).toString();
      return value.includes(_value)
    } );
  },
  filterArrayByAllObjectPropertiesContainingValue(_array,_allowedTypes,_value){
    let arrayCopy = [..._array];
    return arrayCopy.filter(o => {
      return Object.keys(o).some(k => {
        let propertyValue = o[k].toString();
        if(_allowedTypes.includes(typeof propertyValue)){
          return propertyValue.toLowerCase().includes(_value.toLowerCase())
        }
      })
    })
  },
  highlightSearchMatch: function(_text,_search,_flags){
    if(!_search || _search === '') {
      return _text;
    } else if(!_text || _text === '') {
      return _text;
    } else {
      let flags;
      if(_flags) {
        flags = _flags;
      } else {
        flags = 'gi'
      }
      let string = _text.toString();
      let search = new RegExp(_search, flags);
      return string.replace(search, function(match){
        return '<span class="highlighted-match">' + match + '</span>'
      });
    }
  }
}
