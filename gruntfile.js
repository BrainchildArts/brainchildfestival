module.exports = function (grunt) {
  // Do grunt-related things in here
  grunt.loadNpmTasks("assemble");
  grunt.initConfig({
    assemble: {
      options: {
        data: './src/data/*.yml',
        helpers: 'src/helpers/helper-*.js',
        partials: ['./src/partials/*.md', './*.md']
      },
      site: {
        files: [
          {
            dest: "./dist/",
            cwd: './src/',
            expand: true,
            src: "**/*.hbs"
          }
        ]
      }
    }
  });

  return grunt.registerTask('grunt-assemble', ['assemble']);
};