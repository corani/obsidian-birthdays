import { Plugin } from "obsidian";
import { BirthdaysSettings, DEFAULT_SETTINGS, BirthdaysSettingTab } from "./settings";
import { BirthdaysBlock } from "./renderer";

export default class BirthdaysPlugin extends Plugin {
	settings: BirthdaysSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new BirthdaysSettingTab(this.app, this));
		this.registerMarkdownCodeBlockProcessor("birthdays", (source, el, ctx) => {
			ctx.addChild(new BirthdaysBlock(this.app, this.settings, source, el, ctx));
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
