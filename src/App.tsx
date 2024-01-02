import { FileVideo, Github, Upload, Wand2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Slider } from './components/ui/slider'

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Developed with 💜 at NLW</span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              className="resize-none p-4 leading-relaxed"
              placeholder="Add your AI prompt..." 
            />
            <Textarea 
              className="resize-none p-4 leading-relaxed"
              placeholder="AI generated result..." 
              readOnly 
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Remember: you can include the video <code className="text-violet-400">{'{trascription}'}</code> in your promp by utilizing the variable transcription.
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <form className="space-y-6">
            <label 
              htmlFor="video" 
              className="border flex flex-col gap-2 items-center justify-center rounded-md aspect-video cursor-pointer border-dashed text-sm text-muted-foreground hover:bg-primary/5"
            >
              <FileVideo className="w-4 h-4" />
              Select a video
            </label>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="transcription_prompt">Transcription prompt</Label>
              <Textarea 
                id="transcription_prompt" 
                className="h-20 leading-relaxed resixe-none" 
                placeholder="Add keywords mentioned in the video sepparated by comma [ , ]"
              />
            </div>

            <Button type="submit" className="w-full">
              Upload video
              <Upload className="h-4 w-4 ml-2" />
            </Button>

            <input type="file" id="video" accept="video/mp4" className="sr-only"/>
          </form>

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">YouTube title sugestion</SelectItem>
                  <SelectItem value="description">YouTube video description</SelectItem>
                </SelectContent>
              </Select>

            </div>

            <div className="space-y-2">
              <Label>Model</Label>

              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="block text-xs text-muted-foreground italic">You'll be able to customize this option soon</span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperature</Label>

              <Slider min={0} max={1} step={0.1} />

              <span className="block text-xs text-muted-foreground italic leading-relaxed">Higer values tend to make the result more creative and with possible mistakes</span>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Execute
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}

