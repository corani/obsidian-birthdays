import { App, PluginSettingTab, Setting } from "obsidian";
import type BirthdaysPlugin from "./main";

export interface BirthdaysSettings {
	defaultTitle: string;
	defaultLiving: boolean;
	showTitle: boolean;
	peopleFolder: string;
}

export const DEFAULT_SETTINGS: BirthdaysSettings = {
	defaultTitle: "Birthdays",
	defaultLiving: false,
	showTitle: true,
	peopleFolder: "People",
};

export class BirthdaysSettingTab extends PluginSettingTab {
	constructor(app: App, private plugin: BirthdaysPlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		let titleSetting: Setting;

		new Setting(containerEl)
			.setName("Show title")
			.setDesc("When enabled, the block title bar is shown by default.")
			.addToggle(t => t
				.setValue(this.plugin.settings.showTitle)
				.onChange(async v => {
					this.plugin.settings.showTitle = v;
					await this.plugin.saveSettings();
					titleSetting.setDisabled(!v);
				}));

		titleSetting = new Setting(containerEl)
			.setName("Default title")
			.setDesc("Block title when not specified in the block.")
			.addText(t => t
				.setPlaceholder(DEFAULT_SETTINGS.defaultTitle)
				.setValue(this.plugin.settings.defaultTitle)
				.onChange(async v => {
					this.plugin.settings.defaultTitle = v || DEFAULT_SETTINGS.defaultTitle;
					await this.plugin.saveSettings();
				}));
		titleSetting.setDisabled(!this.plugin.settings.showTitle);

		new Setting(containerEl)
			.setName("Show living only")
			.setDesc("When enabled, deceased people are hidden by default.")
			.addToggle(t => t
				.setValue(this.plugin.settings.defaultLiving)
				.onChange(async v => {
					this.plugin.settings.defaultLiving = v;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("People folder")
			.setDesc("Vault-relative folder containing person notes.")
			.addText(t => t
				.setPlaceholder(DEFAULT_SETTINGS.peopleFolder)
				.setValue(this.plugin.settings.peopleFolder)
				.onChange(async v => {
					this.plugin.settings.peopleFolder = v || DEFAULT_SETTINGS.peopleFolder;
					await this.plugin.saveSettings();
				}));
	}
}
