function formatRows(x, y) {
  return '<tr><td class="col-xs-3"><input type="text" value="' +x+ '" class="form-control editable" /></td>' +
         '<td class="col-xs-3"><input type="text" value="' +y+ '" class="form-control editable" /></td>' +
         '<td class="col-xs-1 text-center"><a href="#" onClick="deleteRow(this)">' +
         '<i class="fa fa-trash-o" aria-hidden="true"></a></td></tr>';
};

function deleteRow(trash) {
  $(trash).closest('tr').remove();
};

function addRow() {
  var main = $('.addX').val();
  var preferred = $('.addY').val();
  $(formatRows(main,preferred)).insertAfter('#addRow');
  $(input).val('');  
}

$('.addBtn').click(function()  {
  addRow();
});