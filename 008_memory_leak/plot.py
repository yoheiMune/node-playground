"""
Show the graph that shows heap-size(memory) shifting.

Pre-installed:
    $ pip install matplotlib

"""
import matplotlib.pyplot as plt
import json

statsFile = open('stats.json', 'r')
heapSizes = json.load(statsFile)

print('Plotting %s' % ', '.join(map(str, heapSizes)))

plt.plot(heapSizes)
plt.ylabel('Heap Size')
plt.show()


"""
$ python plot.py 
Fontconfig warning: line 146: blank doesn't take any effect anymore. please remove it from your fonts.conf
Traceback (most recent call last):
  File "plot.py", line 8, in <module>
    import matplotlib.pyplot as plt
  File "/Users/munesadayohei/.pyenv/versions/3.6.0/lib/python3.6/site-packages/matplotlib/pyplot.py", line 115, in <module>
    _backend_mod, new_figure_manager, draw_if_interactive, _show = pylab_setup()
  File "/Users/munesadayohei/.pyenv/versions/3.6.0/lib/python3.6/site-packages/matplotlib/backends/__init__.py", line 32, in pylab_setup
    globals(),locals(),[backend_name],0)
  File "/Users/munesadayohei/.pyenv/versions/3.6.0/lib/python3.6/site-packages/matplotlib/backends/backend_macosx.py", line 19, in <module>
    from matplotlib.backends import _macosx
RuntimeError: Python is not installed as a framework. The Mac OS X backend will not be able to function correctly if Python is not installed as a framework. See the Python documentation for more information on installing Python as a framework on Mac OS X. Please either reinstall Python as a framework, or try one of the other backends. If you are using (Ana)Conda please install python.app and replace the use of 'python' with 'pythonw'. See 'Working with Matplotlib on OSX' in the Matplotlib FAQ for more information.
"""
