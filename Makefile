build:
	@cat exify-metal/exify.coffee exify-metal/table.coffee exify-tables/gps.coffee exify-tables/jpeg.coffee exify-tables/tiff.coffee > exify.coffee

print:
	@`make`
	@cat exify.coffee

clean:
	rm exify.coffee

watch:
	echo "Watching coffee files..."; \
	watchr -e "watch('exify-.*/.*\.coffee') { puts 'Rebuilding...\n' system 'make' }"
