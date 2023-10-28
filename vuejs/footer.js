export default {
    props: ['mode'],
    data() {
        return {

        }
    },
    template: `
    <div class="row mt-3 rounded-3">
        <div class="card {{mode}} border border-1" id="footer">Copyright &copy Nguyen Phuoc Anh Tuan</div>
    </div>
    `
}