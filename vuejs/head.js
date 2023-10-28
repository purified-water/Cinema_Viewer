export default {
    props: ['mode'],
    // methods: {
    //     toggleDarkMode() {
    //         
    //     },
    // },
    template: `
    <div 
    class="alert border border-1 rounded-2 p-2 {{ mode }}"
    role="alert" id="header"
    >
    <div class="container-fluid">
        <div class="d-flex justify-content-between">
        <p class="m-0 align-middle">21120588</p>
        <p class="fs-3">Movies info</p>
        <div>
            <p class="text-end">21588</p>
            <div class="form-check form-switch">
            <input
                class="form-check-input"
                type="checkbox"
                id="darkmodeToggle"
                @change="$emit('toggle')"
            />
            <label class="form-check-label" for="darkmodeToggle">Dark Mode</label>
            </div>
        </div>
        </div>
    </div>
    </div>

  
  
    `
}