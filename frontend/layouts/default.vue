<template>
    <div>
        <template>
            <div>
                <Navbar />
                <main>
                <!-- Your page content goes here -->
                </main>
            </div>
        </template>

        <component :is="'script'">
            import Navbar from '../components/Navbar.vue';

            export default {
                components: {
                    Navbar,
                },
            };
        </component>
        <slot />
    </div>
</template>

<style>
    @import url("../assets/css/main.css");
</style>